import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    // SQLite database configuration
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity, ReportEntity], // Add entities here
      synchronize: true, // dev only
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
