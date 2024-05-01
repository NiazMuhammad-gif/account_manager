import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put
} from '@nestjs/common'
import { CityService } from './city.service'
import { CityRequest } from './city.model'
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) { }

  @Post()
  create(@Body() body: CityRequest) {
    return this.cityService.create(body)
  }

  @Get()
  findAll() {
    return this.cityService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(+id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: CityRequest) {
    return this.cityService.update(+id, body)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(+id)
  }
}
