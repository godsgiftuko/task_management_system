import { IsOptional, IsString, IsNumberString } from 'class-validator';

export class FindDataRequestDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  search_param: string;

  @IsOptional()
  param: string;

  @IsOptional()
  value: string;

  @IsOptional()
  @IsNumberString()
  skip = '0';

  @IsOptional()
  @IsNumberString()
  take = '10';

  @IsOptional()
  @IsString()
  search_by: string;

  @IsOptional()
  usepaginate?: 'false' | 'true' = 'true';
}
