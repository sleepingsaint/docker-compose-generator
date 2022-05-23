interface BLOCK_IO_CONFIG {
    weight?: number;
    weight_device?: {
        path?: string;
        weight?: number;
    };
    device_read_bps: {
        path?: string;
        rate?: number | string;
    };
    device_write_bps: {
        path?: string;
        rate?: number | string;
    };
    device_read_iops: {
        path?: string;
        rate?: number;
    };
    device_write_ips: {
        path?: string;
        rate?: number;
    };
}
export interface Service {
    build?: string;
    blkio_config?: BLOCK_IO_CONFIG;
    cpu_count?: number;
    cpu_percent?: number | string;
    cpu_shares?: number;
    cpu_period?: any;
    cpu_quota?: any;
    cpu_rt_runtime?: number | string;
    cpu_rt_period?: number | string;
    cpus?: any;
    cpuset?: number | number[];
    cap_add?: string[];
    cap_drop?: string[];
    cgroup_parent?: string;
    command?: string | string[];
    configs?:
        | string[]
        | {
              source?: string;
              target?: string;
              uid?: string;
              gid?: string;
              mode?: string | number;
          }[];
    container_name?: string;
    credential_spec?: {
        file?: string;
        registry?: string;
    };
    depends_on?:
        | string[]
        | {
              service_id?: string;
              condition?: string;
          }[];
    deploy?: any;
    device_cgroup_rules?: string[];
    devices?: string[];
    dns?: string[];
    dns_opt?: string[];
    dns_search?: string[];
    domainname?: string;
    entrypoint?: string | string[];
    env_file?: string | string[];
    environment?: Map<String, any>;
    expose?: string[];
    extends?: {
        file?: string;
        service?: string;
    };
    external_links?: string[];
    extra_hosts?: string[];
    group_add?: string[];
    healthcheck?: {
        disable?: boolean;
        test?: string[] | string;
        interval?: string | number;
        timeout?: string | number;
        retries?: number;
        start_period?: number | string;
    };
    hostname?: string;
    image?: string;
    init?: boolean;
    ipc?: string;
    isolation?: any;
    labels?: string[];
    links?: string[];
    logging?: {
        driver?: string;
        options?: Map<String, any>;
    };
    network_mode?: string;
    networks?:
        | string[]
        | {
              network_id?: string;
              aliases?: string[];
              ipv4_address?: string;
              ipv6_address?: string;
              link_local_ips?: string[];
              priority?: number;
          }[];
    volumes?: Map<string, string>;
    // TODO: complete the interface
}

export interface IPAM {
    driver?: string;
    config?: {
        subnet?: string;
        ip_range?: string;
        gateway?: string;
        aux_addresses?: Map<String, String>;
    };
    options?: Map<String, any>;
}
export interface Network {
    driver?: string;
    external?: boolean;
    name?: string;
    driver_opts?: Map<string, string>;
    attachable?: boolean;
    enable_ipv6?: boolean;
    ipam?: IPAM;
    internal?: boolean;
    labels?: Map<string, string>;
}

export interface Volume {
    driver?: string;
    name?: string;
    driver_opts?: Map<string, string>;
    external?: boolean;
    labels?: Map<String, String>;
}

export interface Config {
    config_id: string;
    file?: string;
    external?: boolean;
    name?: string;
}

export interface Secret {
    secret_id: string;
    file?: string;
    external?: boolean;
    name?: string;
}

export interface NodeType {
    nodeType: string;
    label: string;
    service?: Service;
    network?: Network;
    volume?: Volume;
}
