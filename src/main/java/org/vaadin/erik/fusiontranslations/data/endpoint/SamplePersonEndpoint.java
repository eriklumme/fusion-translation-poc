package org.vaadin.erik.fusiontranslations.data.endpoint;

import org.vaadin.erik.fusiontranslations.data.entity.SamplePerson;
import org.vaadin.erik.fusiontranslations.data.service.SamplePersonService;

import java.util.List;
import java.util.Optional;

import com.vaadin.flow.server.connect.Endpoint;

import org.vaadin.artur.helpers.GridSorter;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.vaadin.artur.helpers.PagingUtil;
import javax.validation.constraints.Email;
import java.time.LocalDate;
import javax.annotation.Nullable;
import com.vaadin.flow.server.auth.AnonymousAllowed;

@Endpoint
@AnonymousAllowed
public class SamplePersonEndpoint {

    private SamplePersonService service;

    public SamplePersonEndpoint(@Autowired SamplePersonService service) {
        this.service = service;
    }

    public List<SamplePerson> list(int offset, int limit, List<GridSorter> sortOrder) {
        Page<SamplePerson> page = service
                .list(PagingUtil.offsetLimitTypeScriptSortOrdersToPageable(offset, limit, sortOrder));
        return page.getContent();
    }

    public Optional<SamplePerson> get(Integer id) {
        return service.get(id);
    }

    public SamplePerson update(SamplePerson entity) {
        return service.update(entity);
    }

    public void delete(Integer id) {
        service.delete(id);
    }

    public int count() {
        return service.count();
    }

}
