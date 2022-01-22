export interface Response {
  success: boolean;
  message?: string;
  error?: any;
}

export interface theResponse {
  success: boolean;
  message?: string;
  error?: any;
  data?: any;
}

export interface ControllerResponse {
  success: boolean;
  error?: string;
  message?: string;
}
