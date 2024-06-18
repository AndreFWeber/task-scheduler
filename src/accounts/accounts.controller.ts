import { Body, Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';
import {
  CreateAccountDto,
  GetByIdDto,
  UpdateAccountDto,
  DeleteByIdDto,
} from './dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAccountById(@Param() params: GetByIdDto) {
    return this.accountService.getAccountById({ id: +params.id });
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async createAccount(@Body() accountData: CreateAccountDto) {
    return this.accountService.createAccount(accountData);
  }

  @Put()
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateAccount(@Body() accountData: UpdateAccountDto) {
    return this.accountService.updateAccount({
      where: { id: +accountData.id },
      data: { name: accountData.name },
    });
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async deleteAccountById(@Param() params: DeleteByIdDto) {
    return this.accountService.deleteAccount({ id: +params.id });
  }
}
