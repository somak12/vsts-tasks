import * as tl from 'vsts-task-lib/task';

const area: string = 'TestExecution';
const feature: string = 'TestExecutionTask';

function getDefaultProps() {
    return {
        releaseuri: tl.getVariable('Release.ReleaseUri'),
        releaseid: tl.getVariable('Release.ReleaseId'),
        builduri: tl.getVariable('Build.BuildUri'),
        buildid: tl.getVariable('Build.Buildid')
    };
}

export function publishEvent(properties: { [key: string]: any }): void {
    try {
        tl.publishTelemetry(area, feature, Object.assign(getDefaultProps(), properties));
    } catch (err) {
        //ignore
    }
}