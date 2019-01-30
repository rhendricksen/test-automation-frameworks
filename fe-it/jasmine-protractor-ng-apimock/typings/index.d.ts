export interface INgApiMock {
  delayResponse(data: any, delay: number): Promise<any>;
  deleteGlobalVariable(key: string): Promise<any>;
  echoRequest(data: any, echo: boolean): Promise<any>;
  selectScenario(data: any, scenario: string): Promise<any>;
  setAllScenariosToDefault(): Promise<any>;
  setAllScenariosToPassThrough(): Promise<any>;
  setGlobalVariable(key: string, value: string): Promise<any>;
  setGlobalVariables(variables: any): Promise<any>;
}

declare global {
  const ngApimock: INgApiMock;
}
