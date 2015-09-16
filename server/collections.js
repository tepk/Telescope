PostsByDayAudit = new Mongo.Collection("posts-by-day-audit");
PostsByDayAudit._ensureIndex({day: -1});
