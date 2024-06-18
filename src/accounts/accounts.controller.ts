import { Body, Controller } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get(':id')
  async getAccountById(@Param('id') id: string) {
    return this.accountService.getAccountById({ id: +id });
  }

  @Post()
  async createAccount(@Body() accountData: { email: string; name: string }) {
    return this.accountService.createAccount(accountData);
  }

  @Put()
  async updateAccount(@Body() accountData: { id: string; name: string }) {
    return this.accountService.updateAccount({
      where: { id: +accountData.id },
      data: { name: accountData.name },
    });
  }

  @Delete(':id')
  async deleteAccountById(@Param('id') id: string) {
    return this.accountService.deleteAccount({ id: +id });
  }
}
