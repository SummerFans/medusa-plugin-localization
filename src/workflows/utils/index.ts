type LocaleData = Record<string, any>;
type LocalizedData = Record<string, LocaleData>;


function mergeLocalizedData(data1: LocalizedData, data2: LocalizedData): LocalizedData {
  // 创建数据1的深拷贝作为基础结果
  const result = JSON.parse(JSON.stringify(data1)) as LocalizedData;

  // 遍历数据2的所有语言
  for (const [locale, localeData] of Object.entries(data2)) {
    // 如果结果中不存在当前语言，直接添加整个语言对象
    if (!result[locale]) {
      result[locale] = JSON.parse(JSON.stringify(localeData));
      continue;
    }

    // 合并当前语言的键值对
    for (const [key, value] of Object.entries(localeData)) {
      // 如果值是对象，则递归合并（处理嵌套对象）
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[locale][key] = mergeLocalizedData(
          result[locale][key] || {},
          value
        );
      }
      // 否则直接更新值（基础类型或数组）
      else {
        result[locale][key] = value;
      }
    }
  }

  return result;
}

export {
  mergeLocalizedData
}
