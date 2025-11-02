import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ContactSubmission } from "@shared/schema";
import { format } from "date-fns";

export default function ContactSubmissionsAdmin() {
  const { data: submissions, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contact Submissions</h1>
        <p className="text-muted-foreground">View all contact form submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
          <CardDescription>Total: {submissions?.length || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Brief Message</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions?.map((submission) => (
                <TableRow key={submission.id} data-testid={`row-contact-${submission.id}`}>
                  <TableCell data-testid={`text-name-${submission.id}`}>{submission.name}</TableCell>
                  <TableCell data-testid={`text-email-${submission.id}`}>{submission.email}</TableCell>
                  <TableCell data-testid={`text-phone-${submission.id}`}>{submission.phone}</TableCell>
                  <TableCell>
                    <Badge variant="outline" data-testid={`badge-purpose-${submission.id}`}>{submission.purpose}</Badge>
                  </TableCell>
                  <TableCell className="max-w-md truncate" data-testid={`text-message-${submission.id}`}>{submission.message}</TableCell>
                  <TableCell className="max-w-md truncate" data-testid={`text-brief-message-${submission.id}`}>
                    {submission.briefMessage || '-'}
                  </TableCell>
                  <TableCell data-testid={`text-date-${submission.id}`}>{format(new Date(submission.createdAt), 'MMM d, yyyy')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
