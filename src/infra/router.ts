import { MessageTypes } from "../types";
import { ContentDTO } from "../dto";

import WebSocket from "ws";
import { persistContentUseCase, loadContentUseCase } from "../use.cases";
/**
 *
 */
interface MessageProps {
  type: string;
  payload: {
    content: string;
  };
}

/***
 *
 */

const messageBuilder = ({
  messageType,
  content,
  errorMessage,
}: {
  messageType: MessageTypes;
  content?: ContentDTO;
  errorMessage?: string;
}) => {
  return JSON.stringify({
    type: messageType.toString(),
    payload: {
      ...content,
      errorMessage,
    },
  });
};

/**
 *
 *
 */
export default async (io: any, socket: any, data: any) => {
  try {
    const message: MessageProps = JSON.parse(data);

    switch (message.type) {
      case MessageTypes.LOAD_CONTENT.toString():
        const loadResult = await loadContentUseCase.execute();

        if (loadResult.isSuccess) {
          io.send(
            messageBuilder({
              messageType: MessageTypes.NEW_CONTENT,
              content: loadResult?.getValue()!,
            })
          );
        } else {
          io.send(
            messageBuilder({
              messageType: MessageTypes.ERRORED,
              errorMessage: loadResult?.errorValue()?.toString(),
            })
          );
        }

        break;

      case MessageTypes.SAVE_CONTENT.toString():
        const saveResult = await persistContentUseCase.execute({
          content: message.payload.content,
        });

        if (saveResult.isSuccess) {
          /**
           * description:
           * broadcasting the updated content to each connected client
           */
          socket.clients.forEach((client: any) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                messageBuilder({
                  messageType: MessageTypes.NEW_CONTENT,
                  content: saveResult?.getValue()!,
                })
              );
            }
          });
        } else {
          io.send(
            messageBuilder({
              messageType: MessageTypes.ERRORED,
              errorMessage: saveResult?.errorValue()?.toString(),
            })
          );
        }

        break;
    }
  } catch (error: any) {
    io.send(
      messageBuilder({
        messageType: MessageTypes.ERRORED,
        errorMessage: error?.message,
      })
    );
  }
};
