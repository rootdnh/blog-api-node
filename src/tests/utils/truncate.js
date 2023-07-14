export default async function truncateModel(model){
  await model.destroy({truncate: true, force: true});
}