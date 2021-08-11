import BaseMigration from '@ioc:Zakodium/Mongodb/Migration'

export default class UserMigration extends BaseMigration {
  public up(): void {
    // Write your migration here.
    // For example:
    this.createCollection('users')
  }
}
