export class CreateActivityLogDto {
  actionType: string;
  entityType: string;
  entityTypeId: number;
  createdAt: Date;
  log: {
    text: string,
    date: string    
  };
}
