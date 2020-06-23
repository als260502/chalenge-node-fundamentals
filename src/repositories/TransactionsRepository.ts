/* eslint-disable no-return-assign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (accumulator, transactions) => {
        switch (transactions.type) {
          case 'income':
            accumulator.income += transactions.value;
            break;
          case 'outcome':
            accumulator.outcome += transactions.value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
