import { createContext, useState, useContext } from 'react';

const ConfigContext = createContext();

const useConfigs = () => {
   return useContext(ConfigContext);
};

const ConfigProvider = ({children}) => {
   const [inf, setInf] = useState('');

   const handleInf = (newInf) => {
      setInf(newInf);
   };

   return (
      <ConfigContext.Provider value={{inf, handleInf}}>
         {children}
      </ConfigContext.Provider>
   );
};

export { ConfigProvider, useConfigs};