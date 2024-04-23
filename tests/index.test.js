test("Parse SQL Query with Multiple WHERE Clauses", () => {
  const query = "SELECT id, name FROM sample WHERE age = 30 AND name = John";
  const parsed = parseQuery(query);
  expect(parsed).toEqual({
    fields: ["id", "name"],
    table: "sample",
    whereClauses: [
      {
        field: "age",
        operator: "=",
        value: "30",
      },
      {
        field: "name",
        operator: "=",
        value: "John",
      },
    ],
  });
});

test("Execute SQL Query with Multiple WHERE Clause", async () => {
  const query = "SELECT id, name FROM sample WHERE age = 30 AND name = John";
  const result = await executeSELECTQuery(query);
  expect(result.length).toBe(1);
  expect(result[0]).toEqual({ id: "1", name: "John" });
});

test("Execute SQL Query with Greater Than", async () => {
  const queryWithGT = "SELECT id FROM sample WHERE age > 22";
  const result = await executeSELECTQuery(queryWithGT);
  expect(result.length).toEqual(2);
  expect(result[0]).toHaveProperty("id");
});

test("Execute SQL Query with Not Equal to", async () => {
  const queryWithGT = "SELECT name FROM sample WHERE age != 25";
  const result = await executeSELECTQuery(queryWithGT);
  expect(result.length).toEqual(2);
  expect(result[0]).toHaveProperty("name");
});

test("parseWhereClause with invalid input", () => {
  // Empty string
  expect(() => parseWhereClause("")).toThrow("Invalid condition: ");

  // Invalid conditions
  expect(() => parseWhereClause("age > 22 AND")).toThrow(
    "Invalid condition: age > 22 AND"
  );
  expect(() => parseWhereClause("age >")).toThrow("Invalid condition: age >");
  expect(() => parseWhereClause("age > 22 foo")).toThrow(
    "Invalid condition: age > 22 foo"
  );

  // Non-string input
  expect(() => parseWhereClause(123)).toThrow("Input must be a string");
});
