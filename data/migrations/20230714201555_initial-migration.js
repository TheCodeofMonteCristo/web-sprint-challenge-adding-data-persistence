/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema
      .createTable('projects', table => {
          table.increments('project_id')
          table.string('project_name', 200).notNullable().unique()
          table.string('project_description', 200)
          table.boolean('project_completed').defaultTo(false)
      })
      .createTable('resources', table => {
          table.increments('resource_id')
          table.string('resource_name').notNullable().unique()
          table.string('resource_description', 200)
      })
      .createTable('tasks', table => {
          table.increments('task_id')
          table.string('task_description').notNullable()
          table.string('task_notes', 200)
          table.boolean('task_completed').defaultTo(false)
          table.integer('project_id')
              .unsigned()
              .notNullable()
              .references('project_id')
              .inTable('projects')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT')
        
      })
      .createTable('project_resources', table => {
          table.increments('project_resources_id')
          table.integer('project_id')
              .unsigned()
              .notNullable()
              .references('project_id')
              .inTable('projects')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT')
          table.string('project_name')
              .unsigned()
              .notNullable()
              .references('project_name')
              .inTable('projects')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT')
          table.string('resource_name')
              .unsigned()
              .notNullable()
              .references('resource_name')
              .inTable('resources')
              .onDelete('RESTRICT')
              .onUpdate('RESTRICT')
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = async function(knex) {
    await knex.schema
      .dropTableIfExists('project_resources')
      .dropTableIfExists('tasks')
      .dropTableIfExists('resources')
      .dropTableIfExists('projects')
  };
  