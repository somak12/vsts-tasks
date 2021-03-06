import ma = require('vsts-task-lib/mock-answer');
import tmrm = require('vsts-task-lib/mock-run');
import path = require('path');

let taskPath = path.join(__dirname, '..', 'main.js');
let tr: tmrm.TaskMockRunner = new tmrm.TaskMockRunner(taskPath);

tr.setInput("action", "Update image");
tr.setInput("ConnectedServiceName", "AzureRM");
tr.setInput("vmssName", process.env["noMatchingVmss"] === "true" ? "random-vmss" : "testvmss1");
tr.setInput("imageUrl", process.env["imageUrlAlreadyUptoDate"] === "true" ? "http://old-url" : "https://someurl");
if(!(process.env["customScriptNotSpecified"] === "true")) {
    tr.setInput("customScriptUrl", "https://some-file-url");
}
tr.setInput("customScriptCommand", "powershell .\file.ps1 args");

process.env["AZURE_HTTP_USER_AGENT"] = "L0test";
process.env["ENDPOINT_AUTH_AzureRM"] = "{\"parameters\":{\"serviceprincipalid\":\"id\",\"serviceprincipalkey\":\"key\",\"tenantid\":\"tenant\"},\"scheme\":\"ServicePrincipal\"}";
process.env["ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALID"] = "id";
process.env["ENDPOINT_AUTH_PARAMETER_AzureRM_SERVICEPRINCIPALKEY"] = "key";
process.env["ENDPOINT_AUTH_PARAMETER_AzureRM_TENANTID"] = "tenant";
process.env["ENDPOINT_DATA_AzureRM_SUBSCRIPTIONID"] = "sId";
process.env["ENDPOINT_DATA_AzureRM_SUBSCRIPTIONNAME"] = "sName";
process.env["ENDPOINT_URL_AzureRM"] = "https://management.azure.com/";
process.env["ENDPOINT_DATA_AzureRM_ENVIRONMENTAUTHORITYURL"] = "https://login.windows.net/";
process.env["ENDPOINT_DATA_AzureRM_ACTIVEDIRECTORYSERVICEENDPOINTRESOURCEID"] = "https://login.windows.net/";

tr.registerMock('vsts-task-lib/toolrunner', require('vsts-task-lib/mock-toolrunner'));
tr.registerMock('azure-arm-rest/azure-arm-compute', require('./mock_node_modules/azure-arm-compute'));
tr.run();