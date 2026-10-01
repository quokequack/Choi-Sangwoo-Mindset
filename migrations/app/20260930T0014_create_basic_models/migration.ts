#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/030a1c5e0c24335b33e8aa720f8fb50345d25f7e69572be1b99e2f172789c028/contract';
import endContract from '../../snapshots/030a1c5e0c24335b33e8aa720f8fb50345d25f7e69572be1b99e2f172789c028/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/91e7f9f035806fa2789a4d726ef7724cad434fd6b00014d47ebf12d6e6bb784e/contract';
import startContract from '../../snapshots/91e7f9f035806fa2789a4d726ef7724cad434fd6b00014d47ebf12d6e6bb784e/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  fn,
  lit,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.dropTable({ schema: 'public', table: 'User' }),
      this.createTable({
        schema: 'public',
        table: 'Categories',
        columns: [
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Checkins',
        columns: [
          col('created_at', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('current_streak', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
          col('habit_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('max_streak', 'int4', {
            notNull: true,
            default: lit(0),
            codecRef: { codecId: 'pg/int4@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Habits',
        columns: [
          col('category_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('color', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('frequency', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('happens_every', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('points', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Habits_frequency_check_6c657b21',
            "\"frequency\" IN ('DIARY', 'WEEKLY', 'MONTHLY', 'YEARLY')",
          ),
          checkExpression(
            'Habits_happens_every_check_a48652f2',
            "\"happens_every\" IN ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY')",
          ),
        ],
      }),
      this.createTable({
        schema: 'public',
        table: 'Rewards',
        columns: [
          col('claimed', 'bool', {
            notNull: true,
            default: lit(false),
            codecRef: { codecId: 'pg/bool@1' },
          }),
          col('claimed_at', 'timestamptz', { codecRef: { codecId: 'pg/timestamptz-temporal@1' } }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('habit_id', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('points', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Categories',
        constraint: 'Categories_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Habits',
        constraint: 'Habits_name_key',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Checkins',
        index: 'Checkins_habit_id_idx_86c467ac',
        columns: ['habit_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Habits',
        index: 'Habits_category_id_idx_da7213d4',
        columns: ['category_id'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Rewards',
        index: 'Rewards_habit_id_idx_86c467ac',
        columns: ['habit_id'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Checkins',
        foreignKey: {
          name: 'Checkins_habit_id_fkey',
          columns: ['habit_id'],
          references: { schema: 'public', table: 'Habits', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Habits',
        foreignKey: {
          name: 'Habits_category_id_fkey',
          columns: ['category_id'],
          references: { schema: 'public', table: 'Categories', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Rewards',
        foreignKey: {
          name: 'Rewards_habit_id_fkey',
          columns: ['habit_id'],
          references: { schema: 'public', table: 'Habits', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
