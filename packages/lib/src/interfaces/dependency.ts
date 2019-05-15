export interface IDependency {
  id: string;
  condition: 'started' | 'finished';
}
