import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table } from '../schemas/table.schema';

@Injectable()
export class ReservationService {
  constructor(@InjectModel(Table.name) private tableModel: Model<Table>) {}

  async getAllTables(): Promise<Table[]> {
    return this.tableModel.find().exec();
  }
  
  async createReservation(nTable: number, nPersons: number, reservedAt: Date, reservedBy: string): Promise<Table> {
    const table = await this.tableModel.findOne({ nTable });
    if (table && table.reservedAt && table.reservedAt.getTime() === reservedAt.getTime()) {
      throw new Error('Table is already reserved at this time.');
    }

    return this.tableModel.findOneAndUpdate(
      { nTable },
      { nPersons, reservedAt, reservedBy },
      { new: true, upsert: true }
    ).exec();
  }

  async cancelReservation(nTable: number, reservedAt: Date): Promise<Table> {
    return this.tableModel.findOneAndUpdate(
      { nTable, reservedAt },
      { reservedAt: null, reservedBy: null },
      { new: true }
    ).exec();
  }

  async modifyReservation(nTable: number, newReservedAt: Date, reservedBy: string): Promise<Table> {
    return this.tableModel.findOneAndUpdate(
      { nTable, reservedBy },
      { reservedAt: newReservedAt },
      { new: true }
    ).exec();
  }

  async checkAvailability(nTable: number, reservedAt: Date): Promise<boolean> {
    const table = await this.tableModel.findOne({ nTable, reservedAt }).exec();
    return !table;
  }
}
