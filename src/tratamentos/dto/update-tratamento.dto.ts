import { PartialType } from '@nestjs/swagger';
import { CreateTratamentoDto } from './create-tratamento.dto';

export class UpdateTratamentoDto extends PartialType(CreateTratamentoDto) {}