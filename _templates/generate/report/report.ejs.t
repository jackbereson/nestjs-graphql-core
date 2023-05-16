---
to: src/helpers/report/reports/<%= h.inflection.camelize(name, true) %>.report.ts
---

import { Chart } from "../chart";
import { Report } from "../report";

class <%= h.inflection.camelize(name) %>Report extends Report<any> {
  code: string = "<%= h.inflection.camelize(name) %>Report";
  title: string = "Báo cáo <%= h.inflection.camelize(name) %>";
  requireFilter: boolean = false;
  filters: any[] = [];
  cacheEnabled: boolean = false;
  hidden: boolean = true;
  async query(filter: any, paging?: any): Promise<Chart[]> {
    const charts: Chart[] = [];
    
    return charts;
  }
}

export default new <%= h.inflection.camelize(name) %>Report();
