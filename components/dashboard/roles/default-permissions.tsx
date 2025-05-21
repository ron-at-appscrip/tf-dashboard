"use client";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { defaultPermissionsGroups } from "./roles-permissions-data";

export function DefaultPermissions() {
  return (
    <div className="mt-2">
      <p className="mb-4 text-sm text-muted-foreground">Configure the default permissions that will be applied when creating new roles.</p>
      <Accordion type="multiple" defaultValue={["store"]} className="w-full">
        {defaultPermissionsGroups.map(group => (
          <AccordionItem value={group.key} key={group.key}>
            <AccordionTrigger>{group.title}</AccordionTrigger>
            <AccordionContent>
              {group.permissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.permissions.map((perm, idx) => (
                    <div key={perm.label} className="flex items-center justify-between p-2 rounded hover:bg-accent">
                      <div>
                        <div className="font-medium">{perm.label}</div>
                        <div className="text-xs text-muted-foreground">{perm.description}</div>
                      </div>
                      <Switch checked={perm.enabled} disabled />
                    </div>
                  ))}
                </div>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
} 