
function parseQuery(query) {
    const selectRegex = /SELECT (.+?) FROM (.+?)(?: WHERE (.*))?$/i;
    const match = query.match(selectRegex);

    if (match) {
        const [, fields, table, whereString] = match;
        const whereClauses = whereString ? parseWhereClause(whereString) : [];
        return {
            fields: fields.split(',').map(field => field.trim()),
            table: table.trim(),
            whereClauses
        };
    } else {
        throw new Error('Invalid query format');
    }
}

function parseWhereClause(whereString) {
    if (typeof whereString !== 'string') {
        throw new Error('Input must be a string');
    }

    const conditions = whereString.split(/ AND | OR /i);
    const parsedConditions = [];

    for (let condition of conditions) {
        const parts = condition.trim().split(/\s+/);

        if (parts.length !== 3) {
            throw new Error('Invalid condition: ' + condition);
        }

        const [field, operator, value] = parts;
        parsedConditions.push({ field, operator, value });
    }

    return parsedConditions;
}
module.exports = parseQuery;