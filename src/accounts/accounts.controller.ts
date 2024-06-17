import { Body, Controller } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Get, Param, Post, Put, Delete } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.accountService.account({ id: +id });
  }

  @Post()
  async createAccount(@Body() userData: { email: string; name: string }) {
    return this.accountService.createAccount(userData);
  }

  @Put(':id')
  async updateAccount(
    @Param('id') id: string,
    @Body() userData: { name: string },
  ) {
    return this.accountService.updateAccount({
      where: { id: +id },
      data: { name: userData.name },
    });
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: string) {
    return this.accountService.deleteAccount({ id: +id });
  }
}
