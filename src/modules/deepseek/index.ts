import DeepSeekModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const DEEPSEEK_MODULE = "deepseek"

export default Module(DEEPSEEK_MODULE, {
  service: DeepSeekModuleService,
})