import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('credit_transactions')
export class CreditTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column()
  type!: 'earn' | 'spend' | 'transfer'

  @Column()
  amount!: number

  @Column({ nullable: true })
  recipientId?: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date
}