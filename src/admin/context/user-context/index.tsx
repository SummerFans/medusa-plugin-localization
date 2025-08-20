import { createContext, useContext, useMemo, ReactNode } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

// --- 1. 定义类型 ---

// API返回的用户数据结构
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Context 将提供给消费组件的值的类型
// 包含了数据、状态以及操作
export interface UserContextType {
  user: User | undefined; // 数据可能尚未加载，所以是 undefined
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<UseQueryResult<User, Error>>; // 精确的 refetch 类型
}

// Provider 组件的 props 类型
interface UserProviderProps {
  children: ReactNode;
}

// --- 2. 创建 Context ---

// 使用 `undefined` 作为初始值是类型安全的推荐做法。
// 我们将在自定义 Hook 中检查 context 是否为 undefined，以确保它总是在 Provider 内部使用。
const UserContext = createContext<UserContextType | undefined>(undefined);


// --- 3. 异步数据获取函数 ---

// 这是一个纯粹的异步函数，只负责获取和返回数据。
// TanStack Query 将负责调用它并管理其状态。
const fetchUserData = async (): Promise<User> => {
  // 使用 jsonplaceholder 作为模拟 API
  const { data } = await axios.get<User>('https://jsonplaceholder.typicode.com/users/1');
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  return data;
};


// --- 4. 创建 Provider 组件 ---
export const UserProvider = ({ children }: UserProviderProps) => {
  // 使用 useQuery 替换所有手动的 useState 和 useEffect 逻辑
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery<User, Error>({
    queryKey: ['userData'], // 数据的唯一缓存键
    queryFn: fetchUserData,  // 数据获取函数
  });

  // 使用 useMemo 优化 value 对象，防止不必要的重渲染
  // 只有当 useQuery 返回的值变化时，value 对象才会重新创建
  const value = useMemo(() => ({
    user,
    isLoading,
    error,
    refetch,
  }), [user, isLoading, error, refetch]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};


// --- 5. 创建自定义 Hook ---

// 这是消费组件获取 Context 数据的唯一入口，提供了更好的封装和类型安全
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  // 如果 context 是 undefined，意味着 useUser 没有在 UserProvider 内部使用
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};