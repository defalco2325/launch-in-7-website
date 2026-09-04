export interface ClientSubmissionResult {
  ok?: boolean;
}

export function shouldNavigateToClientSuccess(
  responseOk: boolean,
  result: ClientSubmissionResult | null,
): boolean {
  return responseOk && result?.ok === true;
}