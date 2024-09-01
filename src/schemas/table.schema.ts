import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Table extends Document {
  @Prop({ required: true })
  nTable: number;  // Número de la mesa

  @Prop()
  nPersons: number;  // Capacidad de personas

  @Prop()
  reservedAt: Date;  // Fecha y hora de la reserva

  @Prop()
  reservedBy: string;  // Nombre de la persona que hizo la reserva

  @Prop({ default: Date.now })
  createdAt: Date;  // Fecha de creación del registro
}

export const TableSchema = SchemaFactory.createForClass(Table);