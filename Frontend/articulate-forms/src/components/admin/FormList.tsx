import { motion, AnimatePresence } from "framer-motion";
import { useState, Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Eye, Copy, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form } from "@/types/dashboard";
import { config } from "@/config";
import { toast } from "@/hooks/use-toast";

interface FormListProps {
  forms: Form[];
  expandedRows: Set<string>;
  toggleRow: (id: string) => void;
  onViewForm: (form: Form) => void;
  formatDate: (date: string) => string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export function FormList({ forms, expandedRows, toggleRow, onViewForm, formatDate }: FormListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (id: string, link: string) => {
    try {
      await navigator.clipboard.writeText(link);
      setCopiedId(id);
      toast({ title: "Link copied", description: "Public link copied to clipboard" });
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 1500);
    } catch (error) {
      toast({ title: "Copy failed", description: "Could not copy link", variant: "destructive" as const });
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="hidden sm:table-cell">Created At</TableHead>
            <TableHead className="hidden sm:table-cell">Questions</TableHead>
            <TableHead className="hidden sm:table-cell">Public Link</TableHead>
            <TableHead>Actions</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {forms.map((form) => {
              const publicLink = `${config.appUrl}/test/${form._id}`;
              return (
                <Fragment key={form._id}>
                <motion.tr
                  key={form._id}
                  variants={item}
                  className="group hover:bg-muted/50"
                >
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(form._id)}
                    >
                      {expandedRows.has(form._id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{form.title}</TableCell>
                  <TableCell className="hidden sm:table-cell">{formatDate(form.createdAt)}</TableCell>
                  <TableCell className="hidden sm:table-cell">{form.questions.length}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2 max-w-[420px]">
                      <Input value={publicLink} readOnly className="text-sm truncate" />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(form._id, publicLink)}
                        title={copiedId === form._id ? "Copied" : "Copy link"}
                      >
                        {copiedId === form._id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewForm(form)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </TableCell>
                </motion.tr>
                <motion.tr key={`${form._id}-mobile`} variants={item} className="sm:hidden">
                  <TableCell colSpan={6} className="pt-0">
                    <div className="mt-2 grid gap-3 pl-12">
                      <div>
                        <div className="text-xs text-muted-foreground">Created</div>
                        <div className="text-sm">{formatDate(form.createdAt)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Questions</div>
                        <div className="text-sm">{form.questions.length}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Public link</div>
                        <div className="flex items-center gap-2">
                          <Input value={publicLink} readOnly className="text-sm truncate" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopy(form._id, publicLink)}
                            title={copiedId === form._id ? "Copied" : "Copy link"}
                          >
                            {copiedId === form._id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                </motion.tr>
                </Fragment>
              );
            })}
          </AnimatePresence>
        </TableBody>
      </Table>
    </motion.div>
  );
}
