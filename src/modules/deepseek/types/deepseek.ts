export interface DeepSeekModuleOptions {
  api_key: string;
}
export interface DeepSeekDataMessage {
  // 该消息的发起角色，其值为 tool。
  role: "system" | "user" | "assistant" | "tool";
  // 消息的内容。
  content: string;
}

// https://api-docs.deepseek.com/api/create-chat-completion
export interface DeepSeekChatData {
  messages: DeepSeekDataMessage[];
  model: "deepseek-chat" | "deepseek-reasoner";
  frequency_penalty?: number;
  max_tokens?: number;
  presence_penalty?: number;
  response_format?: { type: "json_object" | "text" };
  stop?: string | string[] | null;
  // 如果设置为 True，将会以 SSE（server-sent events）的形式以流式发送消息增量。消息流以 data: [DONE] 结尾。
  stream?: Boolean;
  // 流式输出相关选项。只有在 stream 参数为 true 时，才可设置此参数。
  // 如果设置为 true，在流式消息最后的 data: [DONE] 之前将会传输一个额外的块。此块上的 usage 字段显示整个请求的 token 使用统计信息，而 choices 字段将始终是一个空数组。所有其他块也将包含一个 usage 字段，但其值为 null。
  stream_options?: { include_usage: Boolean };
  // temperature 采样温度，介于 0 和 2 之间。更高的值，如 0.8，会使输出更随机，而更低的值，如 0.2，会使其更加集中和确定。 我们通常建议可以更改这个值或者更改 top_p，但不建议同时对两者进行修改。
  temperature?: number;
  tools?: {
    type: "function";
    function: {
      description: string;
      name: string;
      // function 的输入参数，以 JSON Schema 对象描述
      parameters: {};
    };
  }[];
  tool_choice?: {};
  logprobs?: boolean;
  // 一个介于 0 到 20 之间的整数 N，指定每个输出位置返回输出概率 top N 的 token，且返回这些 token 的对数概率。指定此参数时，logprobs 必须为 true。
  top_logprobs?: number;
}

// https://api-docs.deepseek.com/api/create-chat-completion
export interface DeepSeekChatCompletion {
  id: string;
  choices: {
    /**
     * stop：模型自然停止生成，或遇到 stop 序列中列出的字符串。
     * length ：输出长度达到了模型上下文长度限制，或达到了 max_tokens 的限制。
     * content_filter：输出内容因触发过滤策略而被过滤。
     * insufficient_system_resource：系统推理资源不足，生成被打断。
     */
    finish_reason:
    | "stop"
    | "length"
    | "content_filter"
    | "tool_calls"
    | "insufficient_system_resource";
    // 该 completion 在模型生成的 completion 的选择列表中的索引。
    index: number;

    message: {
      content: string;
      reasoning_content: string;
      tool_calls: {
        id: string;
        type: string;
        function: {
          name: string;
          arguments: string;
        };
      }[];
      role: string;
    };
    logprobs: {
      content: {
        // 输出的 token。
        token: string;
        // 该 token 的对数概率。-9999.0 代表该 token 的输出概率极小，不在 top 20 最可能输出的 token 中。
        logprob: number;
        // 一个包含该 token UTF-8 字节表示的整数列表。一般在一个 UTF-8 字符被拆分成多个 token 来表示时有用。如果 token 没有对应的字节表示，则该值为 null。
        bytes: number[];
        top_logprobs: {
          token: string;
          logprob: number;
          bytes: number[] | null;
        }[];
      }[];
    };
  }[];

  error?: {
    message: string;
    type: string;
    param: any;
    code: string;
  }
}
export interface DeepSeekBalance {
  error?: string,
  is_available: boolean;
  balance_infos: {
    currency: string; // 货币，人民币或美元
    total_balance: string; // 总的可用余额，包括赠金和充值余额
    granted_balance: string; // 未过期的赠金余额
    topped_up_balance: string; // 充值余额
  }[];
}
