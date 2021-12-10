interface DefaultErrorResponse {
  data: any;
  message: string;
  status: number;
}

interface DefaultSuccessResponse extends Omit<DefaultErrorResponse, 'status'> {
  status?: number;
}

export { DefaultSuccessResponse, DefaultErrorResponse };
