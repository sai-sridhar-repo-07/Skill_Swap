import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('credit_accounts')
export class CreditAccount {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  userId!: string

  @Column({ default: 0 })
  balance!: number

  @Column({ default: 0 })
  totalEarned!: number

  @Column({ default: 0 })
  totalSpent!: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date
}
