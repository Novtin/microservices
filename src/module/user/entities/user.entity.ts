import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user_table',
})
@Index(['login', 'phone'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'Идентификатор пользователя',
    name: 'user_id',
  })
  readonly userId: string;

  @Index()
  @Column('varchar', {
    comment: 'Логин пользователя',
    nullable: false,
    length: 20,
  })
  login: string;

  @Column('varchar', {
    comment: 'Номер телефона пользователя',
    nullable: false,
    length: 20,
  })
  phone: string;

  @Column('varchar', {
    comment: 'Имя пользователя',
  })
  firstName: string;

  @Column('varchar', {
    comment: 'Фамилия пользователя',
  })
  lastName: string;

  @Column('varchar', {
    comment: 'Хеш пароля',
  })
  passwordHash: string;

  @Column('varchar', {
    comment: 'Соль пароля',
  })
  passwordSalt: string;
}
