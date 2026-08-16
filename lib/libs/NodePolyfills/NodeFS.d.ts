declare class NodeFS extends Lib {
    icon: string;
    package: string;
    name: string;
    versions: {
        [key: string]: HyperZFilesystem;
    };
    latestVersion: string;
    getImport(version: string): Promise<any>;
}
