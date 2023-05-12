import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { api } from "../services/api";

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface ITransactionsProviderProps {
  children: ReactNode; //aceita qualquer tipo de conteudo válido para o react
}

interface ITransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface ITransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (transaction: ITransactionInput) => Promise<void>; //função
}

//criando o contexto
const TransactionsContext = createContext<ITransactionsContextData>(
  {} as ITransactionsContextData //forçando o formato do contexto
);

//componente que vai prover as informações para todos os componentes
export function TransactionsProvider({ children }: ITransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]); //começa vazio pois tem vários tranasactions e precisa iniciar o estado com o formato de infomações que terá normalmente

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  //async pois permite que a função espere a resposta da api, e no modal consiga esperar o cadastro de uma coisa para depois fechar o modal
  async function createTransaction(transactionInput: ITransactionInput) {
    //pegar a resposta da api e salvar no estado
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    console.log(response);
    const { transaction: transactionCreated } = response.data; //recebe transaction de dentro da resposta do axios

    setTransactions([...transactions, transactionCreated]); //adiciona a nova transaction no estado com spreed operator, criando um novo vetor
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
