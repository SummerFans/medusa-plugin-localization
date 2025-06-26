import { MedusaService } from "@medusajs/framework/utils";
import { Logger } from "@medusajs/framework/types";
import Client from "./utils/client";
import {
  DeepSeekBalance,
  DeepSeekChatCompletion,
  DeepSeekChatData,
  DeepSeekDataMessage,
  DeepSeekModuleOptions,
} from "./types";

class DeepSeekModuleService extends MedusaService({}) {
  private _client: Client;
  private _logger: Logger;
  public unavailable: boolean

  constructor(
    { logger }: { logger: Logger },
    { api_key }: DeepSeekModuleOptions
  ) {
    super(...arguments);

    this._logger = logger;

    if (!api_key || api_key === '') this.unavailable = true
    this._client = new Client(api_key);
  }

  async chat(messages: DeepSeekDataMessage[]): Promise<DeepSeekChatCompletion> {
    this._logger.debug("[DeepSeekModuleService]: Call Chat");

    const chatData: DeepSeekChatData = {
      model: "deepseek-chat",
      messages: messages,
      response_format: {
        type: 'json_object'
      }
    };

    const rc = await this._client.chat(chatData, {}, this);

    this._logger.debug(`[DeepSeekModuleService]: Result: \n${rc.choices[0].message.content}`);
    return rc;
  }

  async balance(): Promise<DeepSeekBalance> {
    try {
      const balance = await this._client.balance();
      return balance;
    } catch (e) {
      this._logger.error("[DeepSeekModule] balance error:" + e.message);
      return {
        error: e.message,
        is_available: false,
        balance_infos: [
          {
            currency: "USD",
            total_balance: "0.00",
            granted_balance: "0.00",
            topped_up_balance: "0.00",
          },
        ],
      };
    }
  }
}

export default DeepSeekModuleService;
