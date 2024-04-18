import { Resource } from "sst";

const app = {
  async fetch(req: Request) {
    if (req.method === "PUT") {
      const key = crypto.randomUUID();

      await Resource.MyBucket.put(key, req.body, {
        httpMetadata: {
          contentType: req.headers.get("content-type") ?? undefined,
        },
      });

      return new Response(`Object created with key: ${key}`);
    }

    if (req.method === "GET") {
      const sortedObjects = await Resource.MyBucket.list().then((res) =>
        res.objects.sort((x, y) => x.uploaded.getTime() - y.uploaded.getTime()),
      );

      const oldestObject = sortedObjects[0];
      if (!oldestObject) {
        return new Response("No objects found in the bucket", { status: 404 });
      }

      const result = await Resource.MyBucket.get(oldestObject.key);
      if (!result) {
        return new Response("Object not found", { status: 404 });
      }

      const contentType = result.httpMetadata?.contentType;
      return new Response(result.body, {
        headers: contentType ? { "content-type": contentType } : undefined,
      });
    }

    return new Response("Method not allowed", {
      headers: { allow: "GET, PUT" },
      status: 405,
    });
  },
};

export default app;
