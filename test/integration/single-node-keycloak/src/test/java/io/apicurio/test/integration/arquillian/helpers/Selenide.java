/*
 * Copyright 2019 JBoss Inc
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
package io.apicurio.test.integration.arquillian.helpers;

import com.codeborne.selenide.Configuration;
import io.apicurio.test.integration.common.IntegrationTestProperties;

import static com.codeborne.selenide.Selenide.$;
import static com.codeborne.selenide.Selenide.open;


public class Selenide {

    private static final IntegrationTestProperties properties = new IntegrationTestProperties();

    public static void init() {
        Configuration.reportsFolder = properties.get("selenide.reports.dir");
        Configuration.browser = "firefox";
        Configuration.headless = true;
    }
}
