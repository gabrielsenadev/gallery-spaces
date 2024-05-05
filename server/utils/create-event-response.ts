import { EventExecutorData, EventExecutorResponse } from "~/server/type";

type CreateEventResponseInput = {
  event: EventExecutorData;
  code?: number;
  success: boolean;
  message?: string;
  data?: any;
};

export const createEventResponse = ({
  code = 200,
  data,
  event,
  message,
  success
}: CreateEventResponseInput): EventExecutorResponse => {
  setResponseStatus(event, code);

    return {
      success,
      message,
      data,
    };
};
