import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface ServiceCreate {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: ServiceCreate): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw Error('Transaction type is invalid!');
    }
    if (type === 'outcome' && total < value) {
      throw Error('You do not have enouth balance fot this transaction!');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
