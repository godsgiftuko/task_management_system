type ApiResponseShape = {
  message?: string;
  data: any;
};

export function apiResponse(result: ApiResponseShape) {
  Object.assign(result.data, { serviceMessage: result.message });
  return result.data;
}
