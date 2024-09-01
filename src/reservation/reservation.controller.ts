import { Controller, Post, Body, Put, Delete, Param, Get, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: any) {
    const { nTable, nPersons, reservedAt, reservedBy } = createReservationDto;
    return this.reservationService.createReservation(nTable, nPersons, reservedAt, reservedBy);
  }

  @Delete()
  cancel(@Body() cancelReservationDto: any) {
    const { nTable, reservedAt } = cancelReservationDto;
    return this.reservationService.cancelReservation(nTable, reservedAt);
  }

  @Put()
  modify(@Body() modifyReservationDto: any) {
    const { nTable, newReservedAt, reservedBy } = modifyReservationDto;
    return this.reservationService.modifyReservation(nTable, newReservedAt, reservedBy);
  }
  @Get()
  getAllTables() {
    return this.reservationService.getAllTables();
  }
  @Get('availability')
  checkAvailability(@Query('nTable') nTable: number, @Query('reservedAt') reservedAt: Date) {
    return this.reservationService.checkAvailability(nTable, reservedAt);
  }
}
