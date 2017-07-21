/**
 * @license
 * Copyright 2017 JBoss Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {IAuthenticationService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "../models/user.model";
import {Http, Headers, RequestOptions} from "@angular/http";
import {ConfigService} from "./config.service";

/**
 * A version of the authentication service that uses token information passed to it
 * when the application loads.  The assumption here is that authentication is handled
 * on the server (for example via OAuth2 web flow).  The server will then pass the
 * token information down into the angular app.
 */
export class TokenAuthenticationService implements IAuthenticationService {

    private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public authenticated: Observable<boolean> = this._authenticated.asObservable();

    private _authenticatedUser: BehaviorSubject<User> = new BehaviorSubject(null);
    public authenticatedUser: Observable<User> = this._authenticatedUser.asObservable();

    private accessToken: string;

    /**
     * Constructor.
     * @param http
     * @param config
     */
    constructor(private http: Http, private config: ConfigService) {
        this.accessToken = config.authToken();

        this._authenticated.next(true);
        this._authenticatedUser.next(config.user());
    }

    /**
     * Returns the observable for is/isnot authenticated.
     * @return {Observable<boolean>}
     */
    public isAuthenticated(): Observable<boolean> {
        return this.authenticated;
    }

    /**
     * Returns an observable over the currently authenticated User (or null if not logged in).
     * @return {any}
     */
    public getAuthenticatedUser(): Observable<User> {
        return this.authenticatedUser;
    }

    /**
     * Not supported.
     * @param user
     * @param credential
     */
    public login(user: string, credential: any): Promise<User> {
        throw new Error("Not supported.");
    }

    /**
     * Logout.
     */
    public logout(): void {
        window.location.href = this.config.logoutUrl();
    }

    /**
     * Called to inject authentication headers into a remote API call.
     * @param headers
     */
    public injectAuthHeaders(headers: Headers): void {
        let authHeader: string = "bearer " + this.accessToken;
        headers.set("Authorization", authHeader);
    }

}