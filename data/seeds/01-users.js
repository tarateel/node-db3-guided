exports.seed = async (knex) => {
  await knex("users").insert([
    { username: "lao_tzu" },
    { username: "socrates" },
    { username: "seneca" },
  ])
}
