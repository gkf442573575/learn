import {
    Controller,
    Get,
    Req,
    Post,
    HttpCode,
    Param,
    Body
} from '@nestjs/common';
import {
    create
} from 'domain';
import {
    CreateCatDto
} from 'create-cat.dto';


@Controller('cats')

export class CatsController {
    @HttpCode(204)

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {

    }
    @Get()
    async findAll(): Promise < any[] > {
        return [];
    }

    @Get(':id')
    findOne(@Param() params) {
        return {}
    }



}