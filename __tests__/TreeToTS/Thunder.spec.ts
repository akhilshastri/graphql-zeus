import { OperationType } from '../../src/Models';
import { Parser } from '../../src/Parser';
import { TreeToTS } from '../../src/TreeToTS';

const schema = `
type Person{ name:String }
type Query{ people: [Person] }
schema{
    query: Query
}
`;
describe('Thunder tests', () => {
  it('TypeScript: ThunderDefinitions', () => {
    const schema = `
        type Person{ name:String }
        type Query{ people: [Person] }
        schema{
            query: Query
        }
        `;
    const tree = Parser.parseAddExtensions(schema);
    const typeScriptCode = TreeToTS.resolveTree(tree);
    expect(typeScriptCode).toContain(`Thunder = (fn: FetchFunction)`);
  });
  it('Javascript: ThunderDefinitions', () => {
    const schema = `
        type Person{ name:String }
        type Query{ people: [Person] }
        schema{
            query: Query
        }
        `;
    const tree = Parser.parseAddExtensions(schema);
    const { javascript } = TreeToTS.javascript(tree);
    expect(javascript).toContain(`Thunder = (fn)`);
  });
  it('TypeScript: Normal schema Query generation', () => {
    const tree = Parser.parseAddExtensions(schema);
    const typeScriptCode = TreeToTS.resolveTree(tree);
    expect(typeScriptCode).toContain(`${OperationType.query}: ((o: any) =>`);
    expect(typeScriptCode).toContain(`fullChainConstruct(fn)('${OperationType.query}', 'Query')`);
    expect(typeScriptCode).toContain(`OperationToGraphQL<ValueTypes["Query"],Query>`);
  });
  it('Javascript: Normal schema Query generation', () => {
    const tree = Parser.parseAddExtensions(schema);
    const { javascript, definitions } = TreeToTS.javascript(tree);
    expect(javascript).toContain(`${OperationType.query}: (o) =>`);
    expect(javascript).toContain(`fullChainConstruct(fn)('${OperationType.query}', 'Query')`);
    expect(definitions).toContain(`OperationToGraphQL<ValueTypes["Query"],Query>`);
  });
  it('Javascript: Normal schema Query generation', () => {
    const tree = Parser.parseAddExtensions(schema);
    const typeScriptCode = TreeToTS.resolveTree(tree);
    expect(typeScriptCode).toContain(`${OperationType.query}: ((o: any) =>`);
    expect(typeScriptCode).toContain(`fullChainConstruct(fn)('${OperationType.query}', 'Query')`);
    expect(typeScriptCode).toContain(`OperationToGraphQL<ValueTypes["Query"],Query>`);
  });
});
