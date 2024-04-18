import { Resource } from "sst";

const app = {
  async fetch(req: Request) {
    if (req.method == "PUT") {
      const key = crypto.randomUUID();
      const reqBody = req.body;
      const reqContentType = req.headers.get("content-type");

      await Resource.MyBucket.put(key, reqBody, {
        httpMetadata: {
          contentType: reqContentType,
        },
      });

      return new Response(`Object created with key: ${key}`);
    }

    if (req.method == "GET") {
      const sortedObjects = await Resource.MyBucket.list().then((res) =>
        res.objects.toSorted(
          (a, b) => a.uploaded.getTime() - b.uploaded.getTime()
        )
      );

      if (sortedObjects.length > 0) {
        const oldestObject = sortedObjects[0];
        const result = await Resource.MyBucket.get(oldestObject.key);

        return new Response(result.body, {
          headers: {
            "content-type": result.httpMetadata.contentType,
          },
        });
      } else {
        return new Response("No objects found in the bucket", { status: 404 });
      }
    }
  },
};

export default app;
